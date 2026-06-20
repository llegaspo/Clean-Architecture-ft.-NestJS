export interface IUseCase<Input = void, Output = void> {
  execute(input?: Input): Promise<Output>;
}
