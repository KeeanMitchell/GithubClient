export interface ISupabaseRepo {
    saveFavouriteCommits() : Promise<void>;
    updateFavouriteCommits(favourites: string[], user: string) : Promise<void>;
    getFavouriteCommits(): Promise<string[]>
}