import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientService } from "../client/client.service";
import { ClientSignInDto } from "./dto/client_sign_ip.dot";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ClientDocument } from "../client/schemas/client.shema";
import { CreateClientDto } from "../client/dto/create-client.dto";
import { Request, Response } from "express";
import { CreateManagerDto } from "../managers/dto/create-manager.dto";
import { ManagersService } from "../managers/managers.service";
import { ManagerDocument } from "../managers/schemas/manager.schema";
import { ManagerSigInDto } from "./dto/manager_sigin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
    private readonly managerService: ManagersService
  ) {}

  async clientSignUp(createClientDto: CreateClientDto, res: Response) {
    const client = await this.clientService.finByEmail(createClientDto.email);

    if (client) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }

    const hashed_password = await hash(createClientDto.password, 7);
    const newUser = await this.clientService.create({
      ...createClientDto,
      password: hashed_password,
    });
    const tokens = await this.clientGenerateTokens(newUser);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    newUser.hashed_refresh_token = hashed_refresh_token;
    await newUser.save();
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Successfully sign up",
      accessToken: tokens.access_token,
      id: newUser._id,
    };
  }

  async clientSignIn(clientSignInDto: ClientSignInDto, res: Response) {
    const { password, email } = clientSignInDto;
    const client = await this.clientService.finByEmail(email);

    if (!client) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }

    const isPasswordMatching = await compare(password, client.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.clientGenerateTokens(client);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    client.hashed_refresh_token = hashed_refresh_token;
    await client.save();
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Successfully signed in",
      accessToken: tokens.access_token,
      id: client._id,
    };
  }
  async clientGenerateTokens(client: ClientDocument) {
    const payload = {
      id: client._id,
      is_active: client.is_active,
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

  async clientSignOut(clientId: string, res: Response) {
    const client = await this.clientService.findById(clientId);
    if (!client) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }

    client.hashed_refresh_token = null;
    await client.save();

    res.clearCookie("refresh_token");
    return { message: "Successfully signed out" };
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const client = await this.clientService.findById(payload.id);
    if (!client || !client.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki refresh token noto'g'ri"
      );
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      client.hashed_refresh_token
    );
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException("Refresh token mos emas");
    }

    const tokens = await this.clientGenerateTokens(client);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    client.hashed_refresh_token = hashed_refresh_token;
    await client.save();

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      accessToken: tokens.access_token,
    };
  }

  async managerSignUp(createManagerDto: CreateManagerDto, res: Response) {
    const manager = await this.managerService.findByEmail(
      createManagerDto.email
    );

    if (manager) {
      throw new BadRequestException("Bunday manager mavjud");
    }

    const hashed_password = await hash(createManagerDto.password, 7);
    const newManager = await this.managerService.create({
      ...createManagerDto,
      password: hashed_password,
    });
    const tokens = await this.managerGenerateTokens(newManager);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    newManager.hashed_refresh_token = hashed_refresh_token;
    await newManager.save();
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Successfully signed up",
      accessToken: tokens.access_token,
      id: newManager._id,
    };
  }

  async managerSignIn(managerSignInDto: ManagerSigInDto, res: Response) {
    const { password, email } = managerSignInDto;
    const manager = await this.managerService.findByEmail(email);

    if (!manager) {
      throw new UnauthorizedException("Manager topilmadi");
    }

    const isPasswordMatching = await compare(password, manager.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.managerGenerateTokens(manager);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    manager.hashed_refresh_token = hashed_refresh_token;
    await manager.save();
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Successfully signed in",
      accessToken: tokens.access_token,
      id: manager._id,
    };
  }

  async managerSignOut(managerId: string, res: Response) {
    const manager = await this.managerService.findById(managerId);
    if (!manager) {
      throw new UnauthorizedException("Manager topilmadi");
    }

    manager.hashed_refresh_token = null;
    await manager.save();

    res.clearCookie("refresh_token");
    return { message: "Successfully signed out" };
  }
  async refreshManagerToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token topilmadi");
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const manager = await this.managerService.findById(payload.id);
    if (!manager || !manager.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Manager topilmadi yoki refresh token noto'g'ri"
      );
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      manager.hashed_refresh_token
    );
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException("Refresh token mos emas");
    }

    const tokens = await this.managerGenerateTokens(manager);
    const hashed_refresh_token = await hash(tokens.refresh_token, 7);
    manager.hashed_refresh_token = hashed_refresh_token;
    await manager.save();

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      accessToken: tokens.access_token,
    };
  }
  async managerGenerateTokens(manager: ManagerDocument) {
    const payload = {
      id: manager._id,
      is_active: manager.is_active,
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
}
