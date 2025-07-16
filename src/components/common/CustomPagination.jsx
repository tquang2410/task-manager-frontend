import { useState } from 'react';
import { Button, Select, Input, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from '../../styles/components/CustomPagination.module.css';

const CustomPagination = ({ current, pageSize, total, onChange }) => {
    const [jumpPage, setJumpPage] = useState('');

    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (current - 1) * pageSize + 1;
    const endIndex = Math.min(current * pageSize, total);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onChange(newPage, pageSize);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        onChange(1, newPageSize); // Reset to page 1 when changing page size
    };

    // Handle jump to page
    const handleJumpPage = () => {
        const page = parseInt(jumpPage);
        if (page >= 1 && page <= totalPages) {
            handlePageChange(page);
            setJumpPage('');
        }
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current > 3) {
                pages.push('...');
            }

            // Show pages around current
            const start = Math.max(2, current - 1);
            const end = Math.min(totalPages - 1, current + 1);

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            if (current < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (total === 0) return null;

    return (
        <div className={styles.paginationContainer}>
            {/* Left: Page info */}
            <div className={styles.paginationInfo}>
                Showing {startIndex}-{endIndex} of {total} tasks
            </div>

            {/* Center: Page navigation */}
            <div className={styles.paginationControls}>
                <div className={styles.paginationButtons}>
                    {/* Previous button */}
                    <Button
                        icon={<LeftOutlined />}
                        disabled={current === 1}
                        onClick={() => handlePageChange(current - 1)}
                    >
                        Previous
                    </Button>

                    {/* Page numbers */}
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={index} style={{ padding: '0 8px', color: '#999' }}>...</span>
                        ) : (
                            <Button
                                key={page}
                                type={current === page ? 'primary' : 'default'}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        )
                    ))}

                    {/* Next button */}
                    <Button
                        disabled={current === totalPages}
                        onClick={() => handlePageChange(current + 1)}
                    >
                        Next
                        <RightOutlined />
                    </Button>
                </div>
            </div>

            {/* Right: Page size selector & jump */}
            <div className={styles.paginationRight}>
                {/* Page size selector */}
                <div className={styles.pageSizeSelector}>
                    <Select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <Select.Option value={10}>10/page</Select.Option>
                        <Select.Option value={20}>20/page</Select.Option>
                        <Select.Option value={50}>50/page</Select.Option>
                        <Select.Option value={100}>100/page</Select.Option>
                    </Select>
                </div>

                {/* Jump to page */}
                <div className={styles.jumpToPage}>
                    <span>Go to</span>
                    <Input
                        style={{
                            width: '60px !important',
                            minWidth: '60px',
                            maxWidth: '60px',
                            textAlign: 'center'
                        }}
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                        onPressEnter={handleJumpPage}
                        placeholder="Page"
                    />
                    <Button onClick={handleJumpPage}>Go</Button>
                </div>
            </div>
        </div>
    );
};

CustomPagination.propTypes = {
    current: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomPagination;