import * as React from "react";
import {ChevronLeft,ChevronRight} from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ currentPage, totalPages, setCurrentPage, }: PaginationProps) {

    if (totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="default"
                disabled={isFirstPage}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`h-11 rounded-xl border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50 ${isFirstPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>

            {/* Page Info */}
            <div
                className="flex h-11 items-center rounded-xl border border-border bg-muted px-5 text-sm font-medium text-muted-foreground shadow-sm ">
                Page{" "}
                <span className="mx-1 font-semibold text-foreground">
                    {currentPage}
                </span>
                of
                <span className="mx-1 font-semibold text-foreground">
                    {totalPages}
                </span>
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="default"
                disabled={isLastPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`h-11 rounded-xl border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50 ${isLastPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}

export default Pagination;