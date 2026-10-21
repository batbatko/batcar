import {useEffect,useMemo,useState} from 'react';
import {Search,SlidersHorizontal} from 'lucide-react';
import CarCard from '../components/CarCard';
import {listCars} from '../lib/api';
import {configured} from '../lib/supabase';
export default function Catalog(){
    const [cars,setCars]=useState([]),
    [loading,setLoading]=useState(true),
    [error,setError]=useState(''),
    [search,setSearch]=useState(''),
    [fuel,setFuel]=useState(''),
    [sort,setSort]=useState('new');
 useEffect(()=>{let active=true;
    if(!configured){
        setError('Configure Supabase in .env.local to load live listings.');
        setLoading(false);return;
    }
    listCars().then(d=>{
        if(active)setCars(d)})
            .catch(e=>{if(active)setError(e.message)})
        .finally(()=>{if(active)setLoading(false)});
        return()=>{active=false}},[]);
        
const filtered = useMemo(() =>
  cars
    .filter(c =>
      (`${c.make} ${c.model} ${c.location} ${c.trim || ''}`)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (!fuel || c.fuel_type === fuel)
    )
    .sort((a, b) =>
      sort === 'price-low'
        ? a.price - b.price
        : sort === 'price-high'
        ? b.price - a.price
        : sort === 'mileage'
        ? a.mileage - b.mileage
        : new Date(b.created_at) - new Date(a.created_at)
    ),
  [cars, search, fuel, sort]
);


 return <div className="container page-section">
    <div className="page-intro">
        <span className="eyebrow">THE MARKETPLACE</span>
        <h1>Explore our cars<span className="dot">.</span></h1>
        <p>Find your next favourite drive from the latest listings.</p></div>
        <div className="filter-bar"><label className="search-field"><Search size={19}/>
        <input aria-label="Search cars" placeholder="Search make, model or location..." value={search} onChange={e=>setSearch(e.target.value)}/></label>
        <label className="select-field"><SlidersHorizontal size={17}/><select aria-label="Fuel type" value={fuel} onChange={e=>setFuel(e.target.value)}>
            <option value="">All fuel types</option>{['Petrol','Diesel','Hybrid','Electric'].map(v=><option key={v}>{v}</option>)}</select></label>
            <select aria-label="Sort listings" value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="new">Newest first</option><option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option><option value="mileage">Lowest mileage</option></select></div>
                <div className="results-count">{loading?'Loading listings…':`${filtered.length} vehicle${filtered.length===1?'':'s'} found`}</div>
                {error&&<div role="alert" className="alert">{error}</div>}
                {!loading&&!error&&(!filtered.length?<div className="empty">No cars found. Try adjusting your filters or add a new listing.</div>:
                <div className="car-grid">{filtered.map(c=><CarCard key={c.id} car={c}/>)}</div>)}</div>;
}
