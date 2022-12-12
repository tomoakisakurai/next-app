import Head from 'next/head';

export const Meta = () => {
  return (
    <Head>
      <title>勤務時間計算くん</title>
      <meta name='robots' content='noindex' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta
        name='description'
        content={'ボタンを押すだけで簡単に勤務時間を計算することができます。'}
      />
      <meta property='og:url' content={'https://bravojp.com'} />
      <meta property='og:title' content={'勤務時間計算くん'} />
      <meta property='og:site_name' content={'勤務時間計算くん'} />
      <meta
        property='og:description'
        content={'ボタンを押すだけで簡単に勤務時間を計算することができます。'}
      />
      <meta property='og:type' content='website' />
      {/* <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} /> */}
    </Head>
  );
};
