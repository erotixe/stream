const React = require('react');
const { RoutesContainerProvider } = require('stremio-router/RoutesContainerContext');
const Route = require('stremio-router/Router/Route');
const appStyles = require('stremio/App/styles');
const styles = require('./styles');

const RouterDecorator = ({ children }) => (
    <div id={'app'}>
        <RoutesContainerProvider containerClassName={appStyles['router']}>
            <Route>
                <div className={styles['route-content-container']}>
                    {children}
                </div>
            </Route>
        </RoutesContainerProvider>
    </div>
);

module.exports = RouterDecorator;
