'use client';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AffiliateDashboard() {
  const [sales, setSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [loading, setLoading] = useState(true);
  const COMMISSION_RATE = 0.6; // 60%

  useEffect(() => {
    const fetchSales = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const affiliateId = session.user.id;

      const { data, error } = await supabase
        .from('purchases')
        .select('product_id, quantity, products(title, price)')
        .eq('affiliate_id', affiliateId);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      let revenue = 0;
      let commission = 0;

      const formatted = data.map((purchase) => {
        const product = purchase.products;
        const amount = product.price * purchase.quantity;
        const earned = amount * COMMISSION_RATE;

        revenue += amount;
        commission += earned;

        return {
          title: product.title,
          quantity: purchase.quantity,
          price: product.price,
          total: amount,
          earned,
        };
      });

      setSales(formatted);
      setTotalRevenue(revenue);
      setTotalCommission(commission);
      setLoading(false);
    };

    fetchSales();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>💼 Affiliate Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 style={{ marginTop: '1rem' }}>📊 Your Sales</h3>
          <p>Total Sales Value: <strong>${totalRevenue.toFixed(2)}</strong></p>
          <p>Your Commission (60%): <strong>${totalCommission.toFixed(2)}</strong></p>

          {sales.length === 0 ? (
            <p>No affiliate sales yet.</p>
          ) : (
            <ul style={{ marginTop: '1rem' }}>
              {sales.map((item, i) => (
                <li key={i} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
                  <strong>{item.title}</strong><br />
                  Quantity: {item.quantity}<br />
                  Price: ${item.price}<br />
                  Earned: <strong>${item.earned.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
