'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import style from './style';

const services = [
  {
    title: '婚禮氣球佈置',
    tagline: '打造一生難忘的浪漫現場',
    image: '/images/service-picture/wedding-balloon.jpg',
    href: '/service/wedding',
  },
  {
    title: '生日派對佈置',
    tagline: '讓每個生日都成為慶典',
    image: '/images/service-picture/birthday-party-columns.jpg',
    href: '/service/birthday',
  },
  {
    title: '企業活動公關',
    tagline: '開幕、尾牙、發布會一手包辦',
    image: '/images/service-picture/corporate-gamania.jpg',
    href: '/service/corporate',
  },
  {
    title: '求婚告白佈置',
    tagline: '用氣球說出你最想說的話',
    image: '/images/service-picture/proposal-room.jpg',
    href: '/service/proposal',
  },
];

function ServicesSection({ className }: { className?: string }) {
  return (
    <section className={className} id="services">
      <div className="services-grid">
        {services.map((service) => (
          <Link className="service-card" href={service.href} key={service.href}>
            <div className="card-image">
              <Image
                alt={service.title}
                fill
                priority
                sizes="(max-width: 640px) 50vw, 25vw"
                src={service.image}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">{service.title}</h3>
              <p className="card-tagline">{service.tagline}</p>
              <span className="card-cta">了解更多 →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default styled(ServicesSection)`
  ${style}
`;
