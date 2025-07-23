export interface Job {
    title: string;
    company: {
        redirect_url: string | undefined;
        display_name: string | undefined;
    };
    location: {
        redirect_url: string | undefined;
        display_name: string | undefined;
    };
    redirect_url: string;
}