export enum StatusEnum {
    NONE="NONE", 
    ORDERED="ORDERED", 
    READY="READY", 
    SERVED="SERVED", 
    ONROUTE="ONROUTE", 
    DELIVERED="DELIVERED", 
    PAID="PAID", 
    CANCELED="CANCELED", 
    RETURNED="RETURNED"
}

export enum LevelEnum {
    NONE="NONE", 
    CUSTOMER="CUSTOMER",
    KITCHEN="KITCHEN",
    ADMIN="ADMIN",
    SERVICE="SERVICE"
}

export enum Category {
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



