import { Subject } from 'rxjs'
import { NotificationType } from '@carbon-credits/types'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
