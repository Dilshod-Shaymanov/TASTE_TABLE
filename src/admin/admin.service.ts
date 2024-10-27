import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { Model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService
  ) {}

  async adminGenerateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async create(createAdminDto: CreateAdminDto, res: Response) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parols is not match");
    }
    const hashed_password = await hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const { access_token, refresh_token } =
      await this.adminGenerateTokens(newAdmin);
    const hashed_refresh_token = await hash(refresh_token, 7);
    newAdmin.hashed_refresh_token = hashed_refresh_token;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
    await newAdmin.save();

    return {
      message: "Admin created",
      accessToken: access_token,
      id: newAdmin._id,
    };
  }
  async adminSignIn(email: string, password: string, res: Response) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    const isPasswordMatching = await compare(password, admin.hashed_password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const { access_token, refresh_token } =
      await this.adminGenerateTokens(admin);
    const hashed_refresh_token = await hash(refresh_token, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Muvaffaqiyatli kirish",
      accessToken: access_token,
      id: admin._id,
    };
  }

  async adminSignOut(adminId: string, res: Response) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    admin.hashed_refresh_token = null;
    await admin.save();

    res.clearCookie("refresh_token");
    return { message: "Muvaffaqiyatli chiqish" };
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminModel.findById(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Admin topilmadi yoki refresh token noto'g'ri"
      );
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      admin.hashed_refresh_token
    );
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException("Refresh token mos emas");
    }

    const tokens = await this.adminGenerateTokens(admin);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      accessToken: tokens.access_token,
    };
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true });
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
    // return this.adminModel.findOneAndDelete({ _id: id });
  }
}
