using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MagicShowArchives.Models;
using System.Data;

namespace MagicShowArchives.Controllers
{
    public class ClientController : Controller
    {
        MagicShowDBEntities db = new MagicShowDBEntities();

        // GET: Client
        public ActionResult Index()
        {
            return View();
        }

        // GET: Client Detals
        // /Client/GetClient
        public ActionResult GetClient()
        {
            var client = db.Clients.Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Location = x.Location,
            }).ToList();
            return Json(client, JsonRequestBehavior.AllowGet);
        }

        // GET: Client Detals by ID
        // /Client/GetClientById
        public ActionResult GetClientById(int id)
        {
            var client = db.Clients.ToList().Find(x => x.Id == id);
            return Json(client, JsonRequestBehavior.AllowGet);
        }

        // POST: Create new client
        // /Client/Create
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "Id")] Client client)
        {
            db.Clients.Add(client);
            db.SaveChanges();
            return Json(client, JsonRequestBehavior.AllowGet);
        }

        // POST: Edit client
        // /Client/Edit
        [HttpPost]
        public ActionResult Edit(Client client)
        {
            if (ModelState.IsValid)
            {
                db.Entry(client).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(client, JsonRequestBehavior.AllowGet);
        }

        //POST: Delete Client
        // Client/Delete/
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var client = db.Clients.ToList().Find(x => x.Id == id);
            if (client != null)
            {
                db.Clients.Remove(client);
                db.SaveChanges();
            }
            return Json(client, JsonRequestBehavior.AllowGet);
        }
    }
}