import { render, screen } from '@testing-library/react';
import BookingSummaryCard from '@/components/BookingSummaryCard';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useBooking', () => ({
    useBooking: () => ({
        bookingData: {
            checkIn: '2023-10-01',
            checkOut: '2023-10-05',
            citizenship: 0,
            destination: 0,
            hotel: 1,
            boardType: 'BB'
        },
        mealData: {}
    })
}));

describe('BookingSummaryCard', () => {
    it('renders the Complete button', () => {
        render(<BookingSummaryCard />);
        const button = screen.getByText(/Complete/i);
        expect(button).toBeInTheDocument();
    });

    it('renders correct title', () => {
        render(<BookingSummaryCard />);
        const title = screen.getByText('Check your reservation');
        expect(title).toBeInTheDocument();
    });
});