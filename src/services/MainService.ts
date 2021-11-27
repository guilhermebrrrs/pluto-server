import { MainServiceNotStartedError } from "../errors/MainServiceNotStartedError";

export class MainService {
  private static mainService: MainService;

  private constructor() {}

  static initMainService(): void {
    this.mainService = new MainService();
  }

  static getMainService(): MainService {
    if (!this.mainService) throw new MainServiceNotStartedError();

    return this.mainService;
  }
}
