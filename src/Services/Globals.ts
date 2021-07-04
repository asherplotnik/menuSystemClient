class Globals {
}
class DevelopmentGlobals extends Globals {
    public urls = {
        products: "http://localhost:8080/api/products/",
        couponImages: "http://localhost:8080/images/",
        localUrl : "http://localhost:8080/"
    };
}

// Global settings which are suitable only for production:
class ProductionGlobals extends Globals {
    public urls = {
        localUrl : "https://food-order-display.herokuapp.com/"
    };
}

// Creating the correct object
const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;
