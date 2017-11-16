using MagicShowArchives.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MagicShowArchives.Controllers
{
    public class PerformedShowController : Controller
    {
        MagicShowDBEntities db = new MagicShowDBEntities();

        // GET: PerfromedShow
        public ActionResult Index()
        {
            var perfShow = new Performed_Show();
            ViewBag.ClientId = new SelectList(db.Clients, "Id", "Name", perfShow.ClientId);
            ViewBag.ShowId = new SelectList(db.MagicShows, "Id", "Name", perfShow.ShowId);
            return View();
        }

        //Get Details 
        public ActionResult GetDetails()
        {
            var Details = db.Performed_Shows.Select(x => new
            {
                Id = x.Id,
                ShowId = x.MagicShow.Name,
                ClientId = x.Client.Name,
                Date = x.Date
            }).ToList();
            return Json(Details, JsonRequestBehavior.AllowGet);
        }

        //Get Details by ID
        public ActionResult GetById(int id)
        {
            var prodSold = db.Performed_Shows.Where(x => x.Id == id).Select(x => new
            {
                Id = id,
                ShowId = x.ShowId,
                ClientId = x.ClientId,
                DateSold = x.Date
            }).FirstOrDefault();
            return Json(prodSold, JsonRequestBehavior.AllowGet);
        }

        //Create new record
        [HttpPost]
        public ActionResult Create(Performed_Show perfShow)
        {
            db.Performed_Shows.Add(perfShow);
            db.SaveChanges();

            return Json(perfShow, JsonRequestBehavior.AllowGet);
        }


        //Edit record
        [HttpPost]
        public ActionResult Edit(Performed_Show perfShow)
        {
            if (ModelState.IsValid)
            {
                db.Entry(perfShow).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(perfShow, JsonRequestBehavior.AllowGet);
        }


        //Delete Record
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var perfShow = db.Performed_Shows.ToList().Find(x => x.Id == id);
            if (perfShow != null)
            {
                db.Performed_Shows.Remove(perfShow);
                db.SaveChanges();
            }
            return Json(perfShow, JsonRequestBehavior.AllowGet);
        }
    }
}