// Copyright (C) 2017-2023 Smart code 203358507

const React = require('react');
const PropTypes = require('prop-types');
const { useServices } = require('stremio/services');
const useNotifications = require('stremio/common/useNotifications');
const LibItem = require('stremio/common/LibItem');

const ContinueWatchingItem = ({ _id, deepLinks, ...props }) => {
    const { core } = useServices();
    const notifications = useNotifications();

    const newVideos = React.useMemo(() => {
        const count = notifications.items?.[_id]?.length ?? 0;
        return Math.min(Math.max(count, 0), 99);
    }, [_id, notifications.items]);

    const onPosterClick = React.useCallback((event) => {
        event.preventDefault();
        if (deepLinks?.metaDetailsVideos) {
            window.location = deepLinks?.metaDetailsVideos;
        }
    }, [deepLinks]);

    const onPlayClick = React.useCallback((event) => {
        event.preventDefault();
        if (deepLinks?.player ?? deepLinks?.metaDetailsStreams ?? deepLinks?.metaDetailsVideos) {
            window.location = deepLinks?.player ?? deepLinks?.metaDetailsStreams ?? deepLinks?.metaDetailsVideos;
        }
    }, [deepLinks]);

    const onDismissClick = React.useCallback((event) => {
        event.preventDefault();
        if (typeof _id === 'string') {
            core.transport.dispatch({
                action: 'Ctx',
                args: {
                    action: 'RewindLibraryItem',
                    args: _id
                }
            });
            core.transport.dispatch({
                action: 'Ctx',
                args: {
                    action: 'DismissNotificationItem',
                    args: _id
                }
            });
        }
    }, [_id]);

    return (
        <LibItem
            {...props}
            newVideos={newVideos}
            onPosterClick={onPosterClick}
            onPlayClick={onPlayClick}
            onDismissClick={onDismissClick}
        />
    );
};

ContinueWatchingItem.propTypes = {
    _id: PropTypes.string,
    deepLinks: PropTypes.shape({
        metaDetailsVideos: PropTypes.string,
        metaDetailsStreams: PropTypes.string,
        player: PropTypes.string
    }),
};

module.exports = ContinueWatchingItem;
