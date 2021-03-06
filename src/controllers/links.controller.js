const linksCtrl = {};

const pool = require('../database');

linksCtrl.renderAddLink = (req, res) => {
    res.render('links/add');
};

linksCtrl.addLink = async (req, res) => {
    const { nameProduct, initCantd, updateCantd, iva, cost, tipo,unidadMedida } = req.body;
    const newLink = {
        nameProduct,
        initCantd,
        cost,
        unidadMedida,
        tipo,
        updateCantd,
        iva,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Se Guardo Correctamente');
    res.redirect('/links');
}

linksCtrl.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
}

linksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Se Elimino Correctamente');
    res.redirect('/links');
};

linksCtrl.renderEditLink = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
};

linksCtrl.editLink = async (req,res) => {
    const { id } = req.params;
    const { nameProduct, initCantd,updateCantd,iva, cost, tipo,unidadMedida} = req.body; 
    const newLink = {
        nameProduct,
        initCantd,
        cost,
        tipo,
        updateCantd,
        iva,
        unidadMedida
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Se Actualizo Correctamente');
    res.redirect('/links');
}

module.exports = linksCtrl;