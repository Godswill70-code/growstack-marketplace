'use client';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AffiliateDashboard() {
  const [products, setProducts] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [affiliateId, setAffiliateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage('You are not logged in.');
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      setAffiliateId(userId);

      // Fetch all products (to promote)
      const { data: allProducts, error: productError } = await supabase
        .from('products')
        .select('*');

      // Fetch referrals or purchases related to this affiliate
      const { data: myReferrals, error: referralError } = await supabase
        .from('purchases')
        .select('*')
        .eq('affiliate_id', userId);

      if (productError || referralError) {
        setMessage('Failed to load data.');
        setLoading(false);
        return;
      }

      setProducts(allProducts);
      setReferrals(myReferrals);
      setLoading(false);
    };

    fetchData();
  }, []);

  const referralLink = (productId) =>
    `${window.location.origin}/product/${productId}?ref=${affiliateId}`;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🤝 Affiliate Dashboard</h2>
      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 💼 Products to Promote */}
          <div>
            <h3>📢 Promote These Products</h3>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              >
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>💰 Price: ₦{product.price}</p>
                <p>
                  🔗 Your Referral Link:
                  <br />
                  <code>{referralLink(product.id)}</code>
                </p>
              </div>
            ))}
          </div>

          {/* 📈 Referral Stats */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <h3>📊 Your Referrals</h3>
            <p>🧾 Total Referrals: {referrals.length}</p>
            <p>
              💰 Total Earned: ₦
              {referrals
                .reduce((sum, r) => sum + parseFloat(r.affiliate_commission || 0), 0)
                .toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
                                         }
