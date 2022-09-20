import { Post } from "./Post";

export type Followers = {
   id: number;
   name: string;
   avatar: string;
}


export type Following = {
   id: number;
   name: string;
   avatar: string;
}


export type Photo = {
   id: number;
   type: string;
   created_at: Date | string;
   body: string;
}

export type Feed = {
   id: number;
   name: string | null;
   birthdate: string | null | Date;
   ageYears?: number | string;
   city: string | null;
   work: string | null;
   avatar: string | null;
   cover: string | null;
   isFollowing?: boolean;
   followers?: Followers[];
   following?: Following[];
   photo?: Photo[];
   posts?: Post[];
   pageCount?: number;
   currentPage?: number
}
