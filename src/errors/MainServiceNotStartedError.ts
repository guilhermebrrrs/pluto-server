export class MainServiceNotStartedError extends Error {
  constructor() {
    super("MainService not started");
    this.name = "MainServiceNotStartedError";
  }
}
