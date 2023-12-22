class ArtGallery {

    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { "picture":200,"photo":50,"item":250 };
        this.listOfArticles = [];
        this.guests = [];
    }


    addArticle( articleModel, articleName, quantity ) {
        if (!this.possibleArticles.hasOwnProperty(articleModel.toLowerCase())) {
            throw new Error("This article model is not included in this gallery!");
        }
        let article = this.listOfArticles.find(a => a.articleName === articleName && a.articleModel === articleModel.toLowerCase());
        if (article) {
            article.quantity += quantity;
        } else {
            article = {articleModel: articleModel.toLowerCase(), articleName, quantity};
            this.listOfArticles.push(article);
        }
        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest ( guestName, personality) {
        let guest = this.guests.find(g => g.guestName === guestName);
        if (guest) {
            throw new Error(`${guestName} has already been invited.`);
        }
        let points;
        switch (personality) {
            case "Vip":
                points = 500;
                break;
            case "Middle":
                points = 250;
                break;
            default:
                points = 50;
                break;
        }
        guest = {guestName, points, purchaseArticle: 0};
        this.guests.push(guest);
        return `You have successfully invited ${guestName}!`;
    }


    buyArticle ( articleModel, articleName, guestName) {
        let article = this.listOfArticles.find(a => a.articleName === articleName && a.articleModel === articleModel.toLowerCase());
        if (!article) {
            throw new Error("This article is not found.");
        }
        if (article.quantity === 0) {
            return `The ${articleName} is not available.`;
        }
        let guest = this.guests.find(g => g.guestName === guestName);
        if (!guest) {
            return "This guest is not invited.";
        }
        let articlePoint = this.possibleArticles[articleModel.toLowerCase()];
        if (guest.points < articlePoint) {
            return "You need to more points to purchase the article.";
        }
        guest.points -= articlePoint;
        article.quantity--;
        guest.purchaseArticle++;
        return `${guestName} successfully purchased the article worth ${articlePoint} points.`;
    }

    showGalleryInfo (criteria) {
        let result = "";
        if (criteria === "article") {
            result += "Articles information:\n";
            this.listOfArticles.forEach(a => result += `${a.articleModel} - ${a.articleName} - ${a.quantity}\n`);
        } else if (criteria === "guest") {
            result += "Guests information:\n";
            this.guests.forEach(g => result += `${g.guestName} - ${g.purchaseArticle}\n`);
        }
        return result.trim();
    }
}

// const artGallery = new ArtGallery('Curtis Mayfield');
// console.log(artGallery.addArticle('picture', 'Mona Liza', 3));
// console.log(artGallery.addArticle('Item', 'Ancient vase', 2));
// console.log(artGallery.addArticle('PICTURE', 'Mona Liza', 1));


// Successfully added article Mona Liza with a new quantity- 3.
// Successfully added article Ancient vase with a new quantity- 2.
// Successfully added article Mona Liza with a new quantity- 1.

// const artGallery = new ArtGallery('Curtis Mayfield');
// console.log(artGallery.inviteGuest('John', 'Vip'));
// console.log(artGallery.inviteGuest('Peter', 'Middle'));
// console.log(artGallery.inviteGuest('John', 'Middle'));

// You have successfully invited John!
// You have successfully invited Peter!
// John has already been invited.

// const artGallery = new ArtGallery('Curtis Mayfield');
// artGallery.addArticle('picture', 'Mona Liza', 3);
// artGallery.addArticle('Item', 'Ancient vase', 2);
// artGallery.addArticle('picture', 'Mona Liza', 1);
// artGallery.inviteGuest('John', 'Vip');
// artGallery.inviteGuest('Peter', 'Middle');
// console.log(artGallery.buyArticle('picture', 'Mona Liza', 'John'));
// console.log(artGallery.buyArticle('item', 'Ancient vase', 'Peter'));
// console.log(artGallery.buyArticle('item', 'Mona Liza', 'John'));

// John successfully purchased the article worth 200 points.
// Peter successfully purchased the article worth 250 points. 
// This article is not found.

const artGallery = new ArtGallery('Curtis Mayfield'); 
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));

// Articles information:
// picture - Mona Liza - 3
// item - Ancient vase - 1
// Guests information:
// John - 1
// Peter - 1




