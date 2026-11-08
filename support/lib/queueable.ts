type Action = () => Promise<unknown>;

export class Queueable {
  private actions: Action[] = [];

  enqueue(action: Action) {
    this.actions.push(action);
  }

  async apply() {
    for (const action of this.actions.splice(0)) {
      await action();
    }
  }
}
