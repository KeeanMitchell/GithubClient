import { ISupabaseRepo } from "../interfaces/Isupabaseservice";
import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class SupabaseRepo implements ISupabaseRepo {

    // Initialize Supabase client
    private supabaseUrl: string;
    private supabaseKey: string;
    private supabase: SupabaseClient; // Adjust the type according to the Supabase client library
    private tableSchema = `
        id SERIAL PRIMARY KEY,
        strings TEXT[]
        `;
    private favouritesTable = "user_favourites";
    
    constructor(supabaseUrl: string, supabaseKey: string) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async saveFavouriteCommits(): Promise<void> {
        // Define your list of strings
        const stringsList = ['string1', 'string2', 'string3'];
        const user = "KeeanMitchell";

        // Insert the list of strings into the table
        const { error } = await this.supabase
        .from(this.favouritesTable)
        .insert({ userId: user, favourites:stringsList});

        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully');
        }
    }

    async updateFavouriteCommits(favourites: string[], user: string): Promise<void> {

        // Insert the list of strings into the table
        const { error } = await this.supabase
            .from(this.favouritesTable)
            .update({ favourites: favourites })
            .eq('userId', user);

        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully');
        }
    }

    async getFavouriteCommits(user:string): Promise<string[]> {
        // Retrieve the list of strings from the table
        const { data: fetchedData, error: fetchError } = await this.supabase
        .from(this.favouritesTable)
        .select();

        if (fetchError) {
            console.error('Error fetching data:', fetchError.message);
        } else if(fetchedData.find(item => item.userId === user) != undefined){
            console.log('Data fetched successfully:', fetchedData.find(item => item.userId === user));
            return fetchedData.find(item => item.userId === user).favourites;
        // Use the fetched data
        }
        return ["Nothing"];
    }

    //  // Function to check if the table exists
    // private async tableExists() {
    //   const { data, error } = await this.supabase
    //     .from('information_schema.tables')
    //     .select('*')
    //     .eq('table_name', 'your_table_name');
      
    //   if (error) {
    //     throw error;
    //   }
    
    //   return data.length > 0;
    // }

    // private async createTableIfNotExists(tableName: string, tableSchema: string): Promise<void> {
    //     try {
    //       const exists = await this.tableExists();
          
    //       if (!exists) {
    //         const { data, error } = await this.supabase
    //           .from(tableName)
    //           .({ 
    //             tableName, 
    //             schema: tableSchema 
    //           });
            
    //         if (error) {
    //           throw error;
    //         }
            
    //         console.log('Table created successfully:', data);
    //       } else {
    //         console.log('Table already exists');
    //       }
    //     } catch (error) {
    //       console.error('Error creating or checking table:', error.message);
    //     }
    //   }
    // }
}