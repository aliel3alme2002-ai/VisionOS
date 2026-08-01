import { Injectable } from '@nestjs/common';
import { ModelMetadata } from '../models/model-metadata';
import { ModelTask } from '../models/model-task';
import { ModelFramework } from '../models/model-framework';
import { BUILTIN_MODELS } from './builtin-models';

@Injectable()
export class CatalogService {
  private readonly builtinModels: Map<string, ModelMetadata> = new Map();

  constructor() {
    for (const model of BUILTIN_MODELS) {
      this.builtinModels.set(model.id, model);
    }
  }

  public getBuiltinModels(): ModelMetadata[] {
    return Array.from(this.builtinModels.values());
  }

  public findById(id: string): ModelMetadata | null {
    return this.builtinModels.get(id) ?? null;
  }

  public findByTask(task: ModelTask): ModelMetadata[] {
    return this.getBuiltinModels().filter((m) => m.task === task);
  }

  public findByFramework(framework: ModelFramework): ModelMetadata[] {
    return this.getBuiltinModels().filter((m) => m.framework === framework);
  }

  public search(query: string): ModelMetadata[] {
    const q = query.toLowerCase();
    return this.getBuiltinModels().filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.publisher.toLowerCase().includes(q) ||
        m.labels.some((l) => l.toLowerCase().includes(q)),
    );
  }
}
