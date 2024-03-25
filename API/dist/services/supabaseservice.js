"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseRepo = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
class SupabaseRepo {
    constructor(supabaseUrl, supabaseKey) {
        this.tableSchema = `
        id SERIAL PRIMARY KEY,
        strings TEXT[]
        `;
        this.favouritesTable = "user_favourites";
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        this.supabase = (0, supabase_js_1.createClient)(this.supabaseUrl, this.supabaseKey);
    }
    saveFavouriteCommits() {
        return __awaiter(this, void 0, void 0, function* () {
            // Define your list of strings
            const stringsList = ['string1', 'string2', 'string3'];
            const user = "KeeanMitchell";
            // Insert the list of strings into the table
            const { error } = yield this.supabase
                .from(this.favouritesTable)
                .insert({ userId: user, favourites: stringsList });
            if (error) {
                console.error('Error inserting data:', error.message);
            }
            else {
                console.log('Data inserted successfully');
            }
        });
    }
    updateFavouriteCommits(favourites, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Insert the list of strings into the table
            const { error } = yield this.supabase
                .from(this.favouritesTable)
                .update({ favourites: favourites })
                .eq('userId', user);
            if (error) {
                console.error('Error inserting data:', error.message);
            }
            else {
                console.log('Data inserted successfully');
            }
        });
    }
    getFavouriteCommits(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the list of strings from the table
            const { data: fetchedData, error: fetchError } = yield this.supabase
                .from(this.favouritesTable)
                .select();
            if (fetchError) {
                console.error('Error fetching data:', fetchError.message);
            }
            else if (fetchedData.find(item => item.userId === user) != undefined) {
                console.log('Data fetched successfully:', fetchedData.find(item => item.userId === user));
                return fetchedData.find(item => item.userId === user).favourites;
                // Use the fetched data
            }
            return ["Nothing"];
        });
    }
}
exports.SupabaseRepo = SupabaseRepo;
