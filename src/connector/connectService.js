import { metamask } from './metamask'
import { kaikas } from './kaikas'

const service = {
    metamask,
    kaikas
}
export const connectService = (type) => {
    return service[type];
}