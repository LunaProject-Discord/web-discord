export interface Cache<T> {
    data: T;
    expired_at: number;
}
