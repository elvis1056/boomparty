import Link from 'next/link';
import styled from 'styled-components';

import style from './style';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  className?: string;
  items: BreadcrumbItem[];
}

function Breadcrumb({ className, items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      {items.map((item, index) => (
        <span className="breadcrumb-item" key={index}>
          {index > 0 && <span className="breadcrumb-sep">›</span>}
          {item.href ? (
            <Link className="breadcrumb-link" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default styled(Breadcrumb)`
  ${style}
`;
