import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
    tokensPerInterval: 7,
    interval: 'min',
    fireImmediately: true
})

export default limiter