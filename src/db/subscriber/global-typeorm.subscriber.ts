import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class GlobalTypeormSubscriber implements EntitySubscriberInterface<any> {
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log('insert subscribe ===> ', event.entity);
    const id = event.entity.id;
    event.entity.createdBy = id;
    event.entity.updatedBy = id;
    event.manager.save(event.metadata.targetName, event.entity);
  }

  //   beforeInsert(event: InsertEvent<any>): void | Promise<any> {
  //     console.log(event.entity)
  //   }
}
