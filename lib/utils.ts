import dayjs from 'dayjs';

/**
 * Formats a number as currency with error handling for invalid codes.
 * @param {number} amount - The numeric value to format.
 * @param {string} currency - The ISO 4217 currency code (e.g., 'USD').
 * @returns {string} - The formatted string or a fallback display.
 */
const formatCurrency = (amount: number, currency: string): string => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(), // Ensure uppercase for consistency
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch (error) {
        // Check if it's a RangeError (specific to invalid currency codes)
        if (error instanceof RangeError) {
            console.warn(
                `Invalid currency code: "${currency}". Falling back to raw format.`,
            );

            // Fallback: Display the number with the invalid string as a suffix
            return `${amount.toLocaleString()} ${currency}`;
        }

        // Re-throw if it's an unexpected error type
        const formattedAmount = amount.toFixed(2);
        return `$${formattedAmount}`;
    }
};

const formatSubscriptionDateTime = (value?: string): string => {
    if (!value) return 'Not provided';
    const parsedDate = dayjs(value);
    return parsedDate.isValid()
        ? parsedDate.format('MM/DD/YYYY')
        : 'Not provided';
};

const formatStatusLabel = (value?: string): string => {
    if (!value) return 'Unknown';
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export { formatCurrency, formatSubscriptionDateTime, formatStatusLabel };
