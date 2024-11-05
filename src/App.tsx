import './App.css';
import './common.css';

import LinkedIn from './logos/LI-In-Bug.png';
import GitHub from './logos/github-mark.png';
import {
  HashRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { AboutPage } from './about/AboutPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const paths = [];
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i]) {
      continue;
    }
    paths.push({ name: parts[i], url: parts.slice(0, i + 1).join('/') });
  }
  return (
    <>
      {paths.map((item) => (
        <Link key={item.name} to={item.url}>
          {' '}
          / {item.name}
        </Link>
      ))}
    </>
  );
};

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) && // Outside sidebar
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node) // Outside menu button
      ) {
        setShowSidebar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add close function to all links within the sidebar
  useEffect(() => {
    const links = sidebarRef.current?.querySelectorAll('a');
    links?.forEach((link) =>
      link.addEventListener('click', () => setShowSidebar(false)),
    );

    // clean up listeners on unmount
    return () => {
      links?.forEach((link) =>
        link.removeEventListener('click', () => setShowSidebar(false)),
      );
    };
  }, [setShowSidebar]);

  return (
    <div className={'navbar'}>
      <button
        ref={menuButtonRef}
        className={'menu-button'}
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div>
        <Link to={'/'}>
          <b>Home </b>
        </Link>
        <BreadCrumbs />
      </div>
      {/*The sidebar's position is fixed; is there a better location in the tree?*/}
      <SideBar
        ref={sidebarRef}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
    </div>
  );
};

interface SideBarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}

const SideBar = React.forwardRef<HTMLDivElement, SideBarProps>(
  ({ showSidebar }, ref) => {
    return (
      <div
        className={'sidebar ' + (showSidebar ? 'sidebar--visible' : '')}
        ref={ref}
      >
        <div className={'sidebar__inner'}>
          <Link to={'/about'}>About</Link>

          <div className={'sidebar__inner__external-links'}>
            <Link
              to={'https://www.linkedin.com/in/kasper-fyhn/'}
              target={'_blank'}
            >
              <img
                className={'white-image'}
                height={'20px'}
                src={LinkedIn}
                alt={'LinkedIn'}
              />
            </Link>
            <Link to={'https://github.com/KasperFyhn'} target={'_blank'}>
              <img
                className={'white-image'}
                height={'20px'}
                src={GitHub}
                alt={'GitHub'}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

function FrontPage() {
  return (
    <div className="frontpage">
      <h1>kasperfyhn.github.io</h1>
    </div>
  );
}

const Content: React.FC = () => {
  return (
    <div className={'content__container'}>
      <div className={'content__pane'}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <NavBar />

      <div className="root">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route element={<Content />}>
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
