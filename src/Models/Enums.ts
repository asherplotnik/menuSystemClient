export enum StatusEnum {
    NONE="NONE", 
    ORDERED="ORDERED", 
    READY="READY", 
    SERVED="SERVED", 
    PAID="PAID", 
    ONROUTE="ONROUTE", 
    DELIVERED="DELIVERED", 
    CANCELED="CANCELED", 
    RETURNED="RETURNED"
}

export enum LevelEnum {
    NONE="NONE", 
    CUSTOMER="CUSTOMER",
    KITCHEN="KITCHEN",
    ADMIN="ADMIN",
    SERVICE="SERVICE",
    BRAND_MANAGER="BRAND_MANAGER",
    TABLE="TABLE"
}

export enum CategoryEnum {
    NONE="NONE",
    DRINK="DRINK", 
    MAIN_COURSE="MAIN_COURSE",
    STARTER="STARTER", 
    DESSERT="DESSERT", 
    SOUP="SOUP",
    SIDE_DISH="SIDE_DISH"
}

export enum OrderType {
    NONE="NONE",
    TABLE="TABLE", 
    DELIVERY="DELIVERY", 
    PICKUP="PICKUP"
}



