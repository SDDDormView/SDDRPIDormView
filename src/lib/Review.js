//user reviews
import { supabase } from '@/utils/supabase/client';

class Review {
    //encapsulation
    #author;
    #title;
    #content;

    constructor(author, title, content, rating) {
        this.#author = author;
        this.#title = title;
        this.#content = content;
        this.rating = rating;
        this.timestamp = new Date();
    }

    //returns helper object for database storage and UI generation
    get_info() {
        return {
            author: this.#author.get_author_string(),
            title: this.#title,
            rating: this.rating,
            timestamp: this.timestamp,
            content: this.#content
        };
    }

    //method abstraction (simple interface, complex task)
    async addReview(dorm_name) {
        try {
            const reviewData = this.get_info();

            const { data, error } = await supabase
                .from('reviews')
                .insert({
                    dorm_name: dorm_name,
                    author: reviewData.author,
                    title: reviewData.title,
                    content: reviewData.content,
                    rating: reviewData.rating,
                    timestamp: reviewData.timestamp
                });

            if (error) {
                console.error('Error adding review to database:', error.message);
                throw new Error(`Failed to add review: ${error.message}`);
            }

            console.log('Review added successfully:', data);
            return data;
        } catch (error) {
            console.error('Exception in addReview:', error);
            throw error;
        }
    }
}

//simple class for use in review class
class User {
    #username;
    #email;

    constructor(username, email){
        this.#username = username;
        this.#email = email;
    }

    get_author_string(){
        return this.#username + '(' + this.#email + ')';
    }
}

export { Review, User };
