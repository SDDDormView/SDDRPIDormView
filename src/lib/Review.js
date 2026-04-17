//user reviews

class Review {
    //encapsulation
    #author;
    #content;
    #dorm_name;

    constructor(author, content, rating, dorm_name) {
        this.#author = author;
        this.#content = content;
        this.rating = rating;
        this.#dorm_name = dorm_name;
        this.timestamp = new Date();
    }

    //returns helper object for database storage and UI generation
    get_info() {
        return {
            author: this.#author,
            rating: this.rating,
            timestamp: this.timestamp,
            content: this.#content,
            dorm_name: this.#dorm_name
        };
    }

    //method abstraction (simple interface, complex task)
    async addReview(reviewClientInstance) {
        try {
            if (!reviewClientInstance) {
                throw new Error('reviewClient instance is required');
            }

            const reviewData = this.get_info();

            // Use the reviewClient instance to add review
            const data = await reviewClientInstance.addReview(reviewData.dorm_name, reviewData);

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
