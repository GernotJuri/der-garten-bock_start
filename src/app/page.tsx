"use client";

export default function Home() {
    console.log("Home page rendered");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Willkommen in der<br />
                <span className="block">
                    Gartenbockwelt
                </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-10 mb-20 text-primary">
                Wir sind bald für Sie da!
            </p>
        </div>
    );
}
