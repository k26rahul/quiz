import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GuideEngine from '../components/GuideEngine';
import manifest from '../data/manifest.json';

const GuidePage = () => {
  const { slug } = useParams();
  const [guideData, setGuideData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const item = manifest.find(i => i.slug === slug);
    if (item) {
      setMeta(item);
      document.title = `${item.category} Guide: ${item.title}`;
      
      fetch(`${import.meta.env.BASE_URL}data/${item.dataFile}`)
        .then(res => res.json())
        .then(data => {
          setGuideData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch guide data:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!guideData || !meta) {
    return (
      <Layout title="Not Found" subtitle="Guide not found">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-stone-800">Guide not found</h2>
          <p className="text-stone-500 mt-2">The guide you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={meta.title} subtitle={meta.description} prefix={meta.category}>
      <GuideEngine items={guideData} />
    </Layout>
  );
};

export default GuidePage;
