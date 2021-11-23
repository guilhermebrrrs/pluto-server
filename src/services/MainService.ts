import { PrismaClient } from "@prisma/client";
import { MainServiceNotStartedError } from "../errors/MainServiceNotStartedError";

export class MainService {
  private static mainService: MainService;

  private prismaClient: PrismaClient | undefined | null;

  private constructor() {}

  static initMainService(): void {
    this.mainService = new MainService();
  }

  static getMainService(): MainService {
    if (!this.mainService) throw new MainServiceNotStartedError();

    return this.mainService;
  }

  getPrismaClient(): PrismaClient {
    if (!this.prismaClient) this.prismaClient = new PrismaClient();

    return this.prismaClient;
  }
}
