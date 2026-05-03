import React from 'react';
import Layout from '../components/Layout';
import GuideEngine from '../components/GuideEngine';

const GuidePage = ({ data, title, subtitle }) => {
  React.useEffect(() => {
    document.title = `JS Guide: ${title}`;
  }, [title]);

  return (
    <Layout title={title} subtitle={subtitle}>
      <GuideEngine items={data} />
    </Layout>
  );
};

export default GuidePage;
