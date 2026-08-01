export enum ModelStatusEnum {
  DRAFT = 'DRAFT',
  READY = 'READY',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED',
}

export class ModelStatus {
  constructor(private readonly value: ModelStatusEnum) {}

  public getValue(): ModelStatusEnum { return this.value; }
  public isReady(): boolean { return this.value === ModelStatusEnum.READY; }

  public static draft(): ModelStatus { return new ModelStatus(ModelStatusEnum.DRAFT); }
  public static ready(): ModelStatus { return new ModelStatus(ModelStatusEnum.READY); }
  public static deprecated(): ModelStatus { return new ModelStatus(ModelStatusEnum.DEPRECATED); }
  public static archived(): ModelStatus { return new ModelStatus(ModelStatusEnum.ARCHIVED); }

  public static create(statusStr: string): ModelStatus {
    const uppercase = statusStr.toUpperCase() as ModelStatusEnum;
    if (!Object.values(ModelStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid model status: ${statusStr}`);
    }
    return new ModelStatus(uppercase);
  }
}
