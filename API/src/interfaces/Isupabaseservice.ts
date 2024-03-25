export interface ISupabaseRepo {
    saveFavouriteCommits() : Promise<void>;
    updateFavouriteCommits() : Promise<void>;
    getFavouriteCommits(): Promise<void>
}