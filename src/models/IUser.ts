export interface IUser {
    user: User[];
}

export interface User {
    durum:    boolean;
    mesaj:    string;
    bilgiler?: Bilgiler;  // optional type a girmeli demek. hatalı giris yapılanları da destekleyip programın patlamasını önlemek icin
}

export interface Bilgiler {
    userId:      string;
    userName:    string;
    userSurname: string;
    userEmail:   string;
    userPhone:   string;
    face:        string;
    faceID:      string;
}
