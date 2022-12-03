import { Header } from 'components/Header';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <section className='body-font text-gray-600'>
        <div className='container mx-auto px-5 py-24'>
          <div className='mb-20 text-center'>
            <div>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};
