import { Header } from 'components/Header';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='text-center'>{children}</main>
    </>
  );
};
