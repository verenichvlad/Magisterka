import React from 'react';
import { Link } from 'react-router-dom';
import { cownerMenu, tstationMenu } from './MenuData';

const adminSideMenu = ({ userType, location }) => {
  const menuSections = [];
  let menu = {};

  switch (userType) {
    case 'cowner': menu = cownerMenu; break;
    case 'tstation': menu = tstationMenu; break;
    default: menu = {}; break;
  }

  Object.keys(menu).forEach((sectionName) => {
    menuSections.push({
      id: sectionName,
      conf: menu[sectionName],
    });
  });

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu" data-widget="tree">
          <li className="header">MAIN MENU</li>

          {menuSections.map(section => (
            <li key={section.id} className={location.pathname === section.conf.pathname ? 'treeview active menu-open' : 'treeview'}>
              <Link to={section.conf.pathname}>
                <i className={section.conf.icon} />
                <span>{section.conf.title}</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </Link>
              <ul className="treeview-menu">
                {section.conf.anchors.map(anchor => (
                  <li key={anchor.anchor}>
                    <a href={anchor.anchor}><i className="fa fa-circle-o" />{anchor.title}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default adminSideMenu;
