
import { Link } from 'react-router-dom';

import {
  MapPin,
  Gauge,
  CalendarDays,
  ArrowUpRight
} from 'lucide-react';

// ==============================
// HELPER FUNCTIONS & CONSTANTS
// ==============================


export const money = (n) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(n || 0);

// Default image if a car has no image
export const placeholder =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1100&q=80';

// ==============================
// CAR CARD COMPONENT
// ==============================

export default function CarCard({ car }) {
  return (
    <Link
      className="car-card"
      to={'/cars/' + car.id}
    >
      {/* Car image section */}
      <div className="car-photo">
        <img
          src={car.image_url || placeholder}
          alt={`${car.make} ${car.model}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
        />

        <span className="photo-tag">
          {car.fuel_type}
        </span>
      </div>

      {/* Car information section */}
      <div className="car-card-body">

        {/* Car name, model and trim */}
        <div className="card-heading">
          <div>
            <h3>
              {car.make} {car.model}
            </h3>

            <p>
              {car.trim || 'Well maintained vehicle'}
            </p>
          </div>

          <ArrowUpRight size={19} />
        </div>

        {/* Car specifications */}
        <div className="car-meta">

          {/* Year */}
          <span>
            <CalendarDays size={15} />
            {car.year}
          </span>

          {/* Mileage */}
          <span>
            <Gauge size={15} />
            {Number(car.mileage).toLocaleString('en-GB')} mi
          </span>

          {/* Location */}
          <span>
            <MapPin size={15} />
            {car.location}
          </span>

        </div>

        {/* Price and details link */}
        <div className="car-price">
          {money(car.price)}

          <span>
            View details →
          </span>
        </div>

      </div>
    </Link>
  );
}
