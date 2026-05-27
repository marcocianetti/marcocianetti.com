import React from 'react';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import Config from 'config/Config';
import IconUtils from 'utils/IconUtils';

import 'styles/main.scss';

type Props = {
  children: React.ReactNode;

  navBarClassName?: string;
  mainClassName?: string;
  footerClassName?: string;
};

IconUtils.initLibrary();

const Master = ({ navBarClassName, mainClassName, footerClassName, children }: Props) => {
  return (
    <>
      <NavBar links={Config.NavBarLinks} className={navBarClassName} />

      <main className={mainClassName ? `master-layout__main ${mainClassName}` : `master-layout__main`}>
        {children}
      </main>

      <Footer className={footerClassName} />
    </>
  );
};

export default Master;
