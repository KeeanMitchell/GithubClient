"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const inversify_1 = require("inversify");
require("reflect-metadata");
let SupabaseRepo = class SupabaseRepo {
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
    updateFavouriteCommits() {
        return __awaiter(this, void 0, void 0, function* () {
            // Define your list of strings
            const stringsList = ['string4', 'string5', 'string6'];
            const user = "KeeanMitchell";
            // Insert the list of strings into the table
            const { error } = yield this.supabase
                .from(this.favouritesTable)
                .update({ favourites: stringsList })
                .eq('userId', user);
            if (error) {
                console.error('Error inserting data:', error.message);
            }
            else {
                console.log('Data inserted successfully');
            }
        });
    }
    getFavouriteCommits() {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the list of strings from the table
            const { data: fetchedData, error: fetchError } = yield this.supabase
                .from(this.favouritesTable)
                .select();
            if (fetchError) {
                console.error('Error fetching data:', fetchError.message);
            }
            else {
                console.log('Data fetched successfully:', fetchedData);
                // Use the fetched data
            }
        });
    }
};
exports.SupabaseRepo = SupabaseRepo;
exports.SupabaseRepo = SupabaseRepo = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [String, String])
], SupabaseRepo);
