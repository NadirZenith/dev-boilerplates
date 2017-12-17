import config from '../config'

export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};


export const checkAuthenticationArea = (area) => {

    return (req, res, next) => {

        if (req.isAuthenticated() && area in config.security.areas && config.security.areas[area].includes(req.user.username)) {
            next();
        } else {
            req.flash('error', 'Restricted area')
            res.redirect('/login');
        }
    }

};

